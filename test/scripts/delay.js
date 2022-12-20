TIMEOUT(120000); // simulation duration in milliseconds

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
        log.log(
            "Mote [" +
                i +
                "] delayed " +
                parseFloat(g_afDelay[i] / 1000000).toFixed(2) +
                " s\n"
        );
    }
    log.log(
        "Total delayed " + parseFloat(g_fTotalDelay / 1000000).toFixed(2) + " s\n"
    );
    g_fAverageDelay = g_fTotalDelay / g_nMoteCount;
    log.log(
        "Average delayed " +
            parseFloat(g_fAverageDelay / 1000000).toFixed(2) +
            " s\n"
    );
};

while (1) {
    YIELD();
    aMsg = msg.split(" ");
    if (5 > aMsg.length) {
        continue;
    }

    if (!aMsg[0].equals("[RPL]")) {
        continue;
    }

    if (aMsg[2].equals("[RX]")) {
        nSenderId = parseInt(aMsg[3]);
        g_anRxPacketsCount[nSenderId]++;
        g_afRxTime[nSenderId] = time;
        if (g_afTxTime[nSenderId] > 0) {
            fDelay = g_afRxTime[nSenderId] - g_afTxTime[nSenderId];
            if (fDelay > 0) {
                g_afDelay[nSenderId] += fDelay;
                g_fTotalDelay += fDelay;
            }
            if (fDelay > 1000000) {
                log.log(nSenderId + "\n");
            }
        }
    } else if (aMsg[2].equals("[TX]") || aMsg[2].equals("[MTX]") || aMsg[2].equals("[UTX]")) {
        g_anTxPacketsCount[id]++;
        g_afTxTime[id] = time;
    }
}
