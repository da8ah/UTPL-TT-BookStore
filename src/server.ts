import app from "./app/app";
import DBConn from "./services/database/adapters/DBConn";

/************* SERVER ****************/
DBConn.getInstance();

const port = app.get("port");

const server = app.listen(port, () => {
	console.log("Server on port", port);
});

export default server;
