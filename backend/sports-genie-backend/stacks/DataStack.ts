import { StackContext, Function, use } from "sst/constructs";
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { ConfigStack } from "./ConfigStack";

export const DataStack = ({stack, app}: StackContext) => {

    const { ODDS_API_KEY, ODDS_API_URL } = use(ConfigStack);

    const fetchGamesLambda = new Function(stack, 'fetchGamesLambda', {
        functionName: `${app.stage}-${app.name}-fetch-games`,
        handler: 'services/fetch-games/index.handler',
        timeout: '10 minutes',
        logRetention: 'one_month',
        tracing: 'active',
        bind: [ODDS_API_KEY, ODDS_API_URL],
        environment: {}
    });

    const fetchGamesTask = new tasks.LambdaInvoke(stack, 'fetchGamesTask', {
        lambdaFunction: fetchGamesLambda,
        outputPath: '$.Payload'
    });



    return { fetchGamesLambda };
}