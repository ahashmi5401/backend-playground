import {rateLimit} from "express-rate-limit"

export const limiter = function (time , limit) {
    return rateLimit({
        windowMs: time*60*1000,
        limit,
        standardHeaders: true,
        legacyHeaders: false
    })
}