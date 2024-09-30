import { StackContext, Function } from "sst/constructs";
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';

export const DataStack = ({stack, app}: StackContext) => {

    const fetchGamesLambda = new Function(stack, 'fetchGamesLambda', {
        functionName: `${app.stage}-${app.name}-fetch-games`,
        handler: 'services/fetch-games/index.handler',
        timeout: '10 minutes',
        logRetention: 'one_month',
        tracing: 'active',
        bind: [],
        environment: {}
    });

    const fetchGamesTask = new tasks.LambdaInvoke(stack, 'fetchGamesTask', {
        lambdaFunction: fetchGamesLambda,
        outputPath: '$.Payload'
    });



    return { fetchGamesLambda };
}