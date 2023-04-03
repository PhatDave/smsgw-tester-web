import API from "../API";
import {GraphData, Style} from "../CommonObjects";
import Actions from "./EntityActions/Actions";
import Job from "./Job";
import Metrics from "./Metrics";
import PDUProcessor from "./PDUProcessor/PDUProcessor";
import StatusStyles from "./StatusStyles/StatusStyles";
import WebsocketHandler from "./WebsocketHandler/WebsocketHandler";

export default abstract class Entity {
	abstract api: API;
	abstract actions: Actions;
	abstract statusStyles: StatusStyles;
	// TODO: Implement backend interaction with processors
	status: string;
	processors: PDUProcessor[] = [];
	availableProcessors: PDUProcessor[] = [];
	currentJobInfo: { count: number, total: number } = {count: 0, total: 0};
	metrics: Metrics;
	websocketHandler: WebsocketHandler;

	protected constructor() {
	}

	abstract _defaultSingleJob: Job;

	get defaultSingleJob(): Job {
		return this._defaultSingleJob;
	}

	set defaultSingleJob(value: Job) {
		this._defaultSingleJob = value;
	}

	get statusStyle(): string {
		let style: Style = this.statusStyles.getStyle(this.status);
		let stringStyle: string = '';
		if (style.backgroundColor) {
			stringStyle += `background-color: rgba(${style.backgroundColor.r}, ${style.backgroundColor.g}, ${style.backgroundColor.b}, ${style.backgroundColor.a});`;
		}
		if (style.color) {
			stringStyle += `color: rgba(${style.color.r}, ${style.color.g}, ${style.color.b}, ${style.color.a});`;
		}
		return stringStyle;
	}

	get panelStatusStyle(): string {
		let style: Style = this.statusStyles.getStyle(this.status);
		let stringStyle: string = '';
		if (style.panelBackgroundColor) {
			stringStyle += `background-color: rgba(${style.panelBackgroundColor.r}, ${style.panelBackgroundColor.g}, ${style.panelBackgroundColor.b}, ${style.panelBackgroundColor.a});`;
		}
		if (style.panelColor) {
			stringStyle += `color: rgba(${style.panelColor.r}, ${style.panelColor.g}, ${style.panelColor.b}, ${style.panelColor.a});`;
		}
		return stringStyle;
	}

	abstract _defaultMultipleJob: Job;

	get defaultMultipleJob(): Job {
		return this._defaultMultipleJob;
	}

	set defaultMultipleJob(value: Job) {
		this._defaultMultipleJob = value;
	}

	abstract _id: number;

	get id(): number {
		return this._id;
	}

	abstract _arg: string;

	get arg(): string {
		return this._arg;
	}

	abstract _username: string;

	get username(): string {
		return this._username;
	}

	set username(value: string) {
		this._username = value;
		this.update();
	}

	abstract _password: string;

	get password(): string {
		return this._password;
	}

	set password(value: string) {
		this._password = value;
		this.update();
	}

	static parseObject(object: any, constructor: new (...args: any[]) => Entity): Entity {
		let entity: Entity = new constructor(object.url || object.port, object.username, object.password, false);
		entity._id = object.id;
		entity.status = object.status;
		entity.defaultSingleJob = Job.parse(entity, object.defaultSingleJob);
		entity.defaultMultipleJob = Job.parse(entity, object.defaultMultipleJob);
		entity.processors = object.processors.map((processor: any) => PDUProcessor.parse(processor));
		entity.availableProcessors = object.availableProcessors.map((processor: any) => PDUProcessor.parse(processor));
		return entity;
	}

	static initialize(entity: Entity): void {
		entity.metrics = new Metrics();
		entity.websocketHandler = new WebsocketHandler(entity);
		console.log(`Initializing ${entity.constructor.name}`);
		entity.postInit();
	}

	static updateSimpleField(originObject: any, targetObject: any, originField: string, targetField: string) {
		if (!!originObject[originField] && originObject[originField] !== targetObject[targetField]) {
			targetObject[targetField] = originObject[originField];
		}
	}

	save(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.api.create(this).then((entity: any) => {
				this._id = object.id;
				this.status = object.status;
				this.defaultSingleJob = Job.parse(this, object.defaultSingleJob);
				this.defaultMultipleJob = Job.parse(this, object.defaultMultipleJob);
				this.processors = object.processors.map((processor: any) => PDUProcessor.parse(processor));
				this.availableProcessors = object.availableProcessors.map((processor: any) => PDUProcessor.parse(processor));
				resolve();
			});
		});
	}

	addProcessor(processor: PDUProcessor): Promise<void> {
		return this.api.applyProcessor(this, processor);
	}

	removeProcessor(processor: PDUProcessor): Promise<void> {
		return this.api.removeProcessor(this, processor);
	}

	updateFields(entityObject: any): void {
		Entity.updateSimpleField(entityObject, this, 'username', '_username');
		Entity.updateSimpleField(entityObject, this, 'password', '_password');
		Entity.updateSimpleField(entityObject, this, 'status', 'status');

		entityObject.processors.forEach((processor: any) => {
			let existing = this.processors.find((p: PDUProcessor) => p.name === processor.name);
			if (!existing) {
				this.processors.push(PDUProcessor.parse(processor));
			}
		});
		this.processors.forEach((processor: PDUProcessor) => {
			let existing = entityObject.processors.find((p: any) => p.name === processor.name);
			if (!existing) {
				this.processors.splice(this.processors.indexOf(processor), 1);
			}
		});
	}

	abstract postInit(): void;

	abstract serialize(): object;

	connect(): Promise<void> {
		return this.api.connect(this);
	}

	disconnect(): Promise<void> {
		return this.api.disconnect(this);
	}

	bind(): Promise<void> {
		return this.api.bind(this);
	}

	update(): Promise<void> {
		return this.api.update(this);
	}

	updateJobs(): void {
		this.api.configureSendOneDefault(this);
		this.api.configureSendManyDefault(this);
	}

	runJob(job: Job): void {
		if (!!job.perSecond) {
			this.currentJobInfo = {count: 0, total: job.count};
			this.api.sendManyDefault(this);
		} else {
			this.api.sendOneDefault(this);
		}
	}

	stopJob(): void {
		this.api.cancelSendMany(this);
	}

	getGraphData(): GraphData {
		return this.metrics.graphData;
	}

	delete(): Promise<void> {
		return this.api.delete(this);
	}
}