import * as oddsAPI from '../../packages/integrations/odds-api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

function handleError(e: any, lambdaResponseHeaders: any) {
    return {
        statusCode: 500,
        headers: lambdaResponseHeaders,
        body: JSON.stringify({
            errorMessage: `Error: ${e.message}, ${e.stack}`,
        }),
    };
}

dayjs.extend(utc);


export const handler = async (event: any) => {
    const lambdaResponseHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
    };

    try {
        const sport = event.sport;
        const sportID = oddsAPI.SPORTS_KEY_MAP[sport];
        if (sportID) {
            const start = dayjs().utc().startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');
            const end= dayjs().utc().endOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');
            const rawGamesList = await oddsAPI.getGames(sportID, start, end);
            return rawGamesList?.data;
        }
        else {
            console.error('Invalid sport key: ', sport);
            return { error: 'Invalid sport' };
        }
    } catch (error) {
        return handleError(error, lambdaResponseHeaders);
    }
}