import { operationId } from "./from-swag";
import sf from "./spring-foxios";

export default function(o: operationId) {
	return sf.get(o)
}