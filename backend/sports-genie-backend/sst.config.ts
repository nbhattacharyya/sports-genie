import { SSTConfig } from "sst";
import { API } from "./stacks/ApiStack";
import { ConfigStack } from "./stacks/ConfigStack";
import { DataStack } from "./stacks/DataStack";

export default {
  config(_input) {
    return {
      name: "sports-genie-backend",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(ConfigStack);
    app.stack(DataStack)
    app.stack(API);
  }
} satisfies SSTConfig;
