import { SSTConfig } from "sst";
import { API } from "./stacks/ApiStack";

export default {
  config(_input) {
    return {
      name: "sports-genie-backend",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
