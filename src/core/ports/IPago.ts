export default interface IPago {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	procesarPago(amount: number): Promise<any>;
}
