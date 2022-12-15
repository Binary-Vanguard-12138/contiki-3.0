TIMEOUT(120000); // simulation duration in milliseconds

g_aMotes = sim.getMotes();
g_nMoteCount = g_aMotes.length;

/* RPL control messages */
g_anDioSentCount = new Array();
g_anDaoSentCount = new Array();
g_anDisSentCount = new Array();
g_nTotalDioSent = 0;
g_nTotalDaoSent = 0;
g_nTotalDisSent = 0;
g_nTotalRpl = 0;

for (i = 1; i <= g_nMoteCount; i++) {
    g_anDioSentCount[i] = 0;
    g_anDaoSentCount[i] = 0;
    g_anDisSentCount[i] = 0;
}

timeout_function = function () {
    sCaption = "#T :         ID       DIO     DAO        DIS " + "\n";
    log.log(sCaption);
    for (i = 1; i <= g_nMoteCount; i++) {
        sLine =
            i +
            "   " +
            g_anDioSentCount[i] +
            "   " +
            g_anDaoSentCount[i] +
            "   " +
            g_anDisSentCount[i] +
            "\n";
        log.log(sLine);
    }
    sLine =
        "-" +
        "   " +
        g_nTotalDioSent +
        "   " +
        g_nTotalDaoSent +
        "   " +
        g_nTotalDisSent +
        "\n";
    log.log(sLine);
    log.log("Total RPL sent: " + g_nTotalRpl);
    log.testOK();
};

while (true) {
    YIELD();
    if (!msg) {
        continue;
    }
    aMsg = msg.split(" ");
    if (5 > aMsg.length) {
        continue;
    }

    if (aMsg[0] !== "[RPL]") {
        continue;
    }

    // Should count only RX packets.
    if (aMsg[1] == "[DIO]" && aMsg[2] !== "[RX]") {
        g_anDioSentCount[id]++;
        g_nTotalDioSent++;
        g_nTotalRpl++;
    }
    if (aMsg[1] == "[DAO]" && aMsg[2] !== "[RX]") {
        g_anDaoSentCount[id]++;
        g_nTotalDaoSent++;
        g_nTotalRpl++;
    }
    if (aMsg[1] == "[DIS]" && aMsg[2] !== "[RX]") {
        g_anDisSentCount[id]++;
        g_nTotalDisSent++;
        g_nTotalRpl++;
    }
}
