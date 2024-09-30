import { StackContext, Api, EventBus } from "sst/constructs";
import { DataStack } from "./DataStack";

export function API({ stack, app }: StackContext) {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const { fetchGamesLambda } = DataStack({stack, app});

  const api = new Api(stack, "api", {
    defaults: {},
    routes: {
      "GET /games": fetchGamesLambda
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
