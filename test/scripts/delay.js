TIMEOUT(300000, log.log("Total PRR " + totalPRR + "\n"));

g_aMotes = sim.getMotes();
g_nMoteCount = g_aMotes.length;

g_anRxPacketsCount = new Array();
g_anTxPacketsCount = new Array();
g_afRxTime = new Array();
g_afTxTime = new Array();
g_afDelay = new Array();
g_fTotalDelay = 0;
g_fAverageDelay = 0;

for (i = 0; i <= g_nMoteCount; i++) {
    g_anRxPacketsCount[i] = 0;
    g_anTxPacketsCount[i] = 0;
    g_afRxTime[i] = 0.0;
    g_afTxTime[i] = 0.0;
    g_afDelay[i] = 0.0;
}

timeout_function = function () {
    for (i = 1; i <= g_nMoteCount; i++) {
        log.log("Mote [" + i + "] delayed " + g_afDelay[i] + " microseconds\n");
    }
    log.log("Total delayed " + g_fTotalDelay + " microseconds\n");
    g_fAverageDelay = g_fTotalDelay / g_nMoteCount;
    log.log("Average delayed " + g_fAverageDelay + " microseconds\n");
};

while (1) {
    YIELD();
    aMsg = msg.split(" ");
    if (aMsg[0].equals("DATA")) {
        if (aMsg[1] == "recv" || aMsg.length == 9) {
            // Received packet

            senderID = parseInt(aMsg[8]);
            g_anRxPacketsCount[senderID]++;
            g_afRxTime[senderID] = time;
            if (g_afTxTime[senderID] > 0) {
                fDelay = g_afRxTime[i] - g_afTxTime[i];
                if (fDelay > 0) {
                    g_afDelay[i] += fDelay;
                    g_fTotalDelay += fDelay;
                }
            }
        } else if (aMsg[1] == "send" || aMsg.length == 6) {
            // Sent packet
            g_anTxPacketsCount[id]++;
            g_afTxTime[id] = time;
        }
    }
}
