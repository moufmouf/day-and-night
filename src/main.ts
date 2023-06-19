/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {parseCronExpression} from "cron-schedule";
import {TimerBasedCronScheduler as scheduler} from "cron-schedule/schedulers/timer-based.js";


console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

    // At 19:00, hide the laptops
    const cronStartNight = parseCronExpression('0 19 * * *');
    scheduler.setInterval(cronStartNight, () => {
        WA.room.hideLayer("above/laptops");
    });

    // At 7:00, show the laptops
    const cronStartDay = parseCronExpression('0 7 * * *');
    scheduler.setInterval(cronStartDay, () => {
        WA.room.showLayer("above/laptops");
    });

    // If the player enters the room between 19:00 and 7:00, hide the laptops
    const date = new Date();
    const startNight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 0, 0);
    const startDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0);
    if (date > startNight || date < startDay) {
        WA.room.hideLayer("above/laptops");
    }


}).catch(e => console.error(e));


export {};
