import { getRatioEstimate } from "$lib/server/backend.server";
import { json, error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ fetch, params }) => {
    const percentage = Number(params.percentage);

    if (!Number.isInteger(percentage) || percentage < 1 || percentage > 100) {
        error(400, "percentage must be an integer from 1 to 100");
    }

    return json(await getRatioEstimate(fetch, percentage));
};
