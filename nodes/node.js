"use strict";
module.exports = function (RED) {
    function ExampleNode(config) {
        RED.nodes.createNode(this, config);
        this.on('input', (msg, send, done) => {
            msg.topic = config.topic;
            msg.payload = msg.payload.message || "Hello from Example Node";
            send(msg);
            if (done)
                done();
        });
    }
    RED.nodes.registerType('example', ExampleNode);
};
