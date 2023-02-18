import * as NodeRED from "node-red";

interface ExampleNodeConfig extends NodeRED.NodeDef{
    topic:string
}

// interface AnotherNodeConfig extends NodeRED.NodeDef{}

export = function(RED:NodeRED.NodeAPI){

    function ExampleNode(this:NodeRED.Node, config:ExampleNodeConfig){
      RED.nodes.createNode(this,config);
      this.on('input',(msg:any,send,done)=>{
          msg.topic = config.topic;
          msg.payload = msg.payload.message || "Hello from Example Node";
          send(msg);
          if(done) done();
      });
    }

    RED.nodes.registerType('example',ExampleNode);
    
    // function AnotherNode(this:NodeRED.Node, config:AnotherNodeConfig){
    //     RED.nodes.createNode(this,config);
    //     this.on('input',(msg:any,send,done)=>{
    //         msg.payload = "Hello from Another Node";
    //         send(msg);
    //         if(done) done();
    //     });
    //   }
    // RED.nodes.registerType('another',AnotherNode);
      
}