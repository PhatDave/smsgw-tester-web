import ZlibCoder from "../../ZlibCoder";
import Entity from "../Entity";
import CounterEventProcessor from "./Processor/CounterEventProcessor";
import PduRXEventProcessor from "./Processor/PduRXEventProcessor";
import PduTXEventProcessor from "./Processor/PduTXEventProcessor";
import StateEventProcessor from "./Processor/StateEventProcessor";
import StatusEventProcessor from "./Processor/StatusEventProcessor";
import WebsocketEventProcessor from "./WebsocketEventProcessor";

export default class WebsocketHandler {
	static readonly WS_URL: string = 'ws://localhost:8191';
	private readonly entity: Entity;
	private websocket: WebSocket;
	private processors: WebsocketEventProcessor[] = [];

	constructor(entity: Entity) {
		this.entity = entity;
		this.setupEntity();
	}

	private setupEntity(): void {
		if (this.entity.id !== undefined) {
			this.constructProcessors();
			this.setupWebsocket();
		} else {
			setTimeout(() => this.setupEntity(), 50);
		}
	}

	private constructProcessors(): void {
		this.processors.push(new StatusEventProcessor(this.entity));
		this.processors.push(new CounterEventProcessor(this.entity));
		this.processors.push(new StateEventProcessor(this.entity));
		this.processors.push(new PduRXEventProcessor(this.entity));
		this.processors.push(new PduTXEventProcessor(this.entity));
	}

	private setupWebsocket(): void {
		this.websocket = new WebSocket(WebsocketHandler.WS_URL);
		this.websocket.onopen = this.eventWebsocketOpen.bind(this);
		this.websocket.onerror = this.eventWebsocketError.bind(this);
		this.websocket.onclose = this.eventWebsocketClosed.bind(this);
		this.websocket.onmessage = this.eventWebsocketMessage.bind(this);
	}

	private eventWebsocketMessage(message: any): void {
		let textMessage: string = ZlibCoder.decompress(message.data);
		this.processors.forEach((processor: WebsocketEventProcessor) => processor.process(JSON.parse(textMessage)));
	}

	private eventWebsocketClosed(): void {
		this.setupWebsocket();
	}

	private eventWebsocketError(): void {
		console.log("Websocket error!");
	}

	private eventWebsocketOpen(): void {
		let entityName: string = this.entity.constructor.name.split("Entity")[0];
		this.websocket.send(`${entityName}:${this.entity.id}`);
	}
}
