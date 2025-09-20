import { io } from "socket.io-client";
import { baseUrl } from "./base";

export const createSocketConnection = () => {
    return io(baseUrl);
}
