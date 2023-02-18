# node-red-contrib-typescript-template :package:
This is a typescript template project for creating your own Node-RED nodes. 

:icecream: **Example Node included!** :icecream:

## Install :zap:
Follow these commands to set up your Typescript Node-RED node project:
```console
git clone https://github.com/Doth-J/node-red-contrib-typescript-template.git
cd ./node-red-contrib-typescript-template
npm install
```
After that your are all set and ready to begin developing your own nodes.

## Building your Nodes :hammer:
To build the nodes you have developed execute the following command:
```console
npm run build
```
## Installing your Nodes :zap:
Once you have build your nodes, _inside the `~/.node-red` directory_, execute the following command:
```console
npm install ../path/to/project/
```

## Creating your Nodes :gear:
The template provides you with a basic Node-RED node typescript project structure. Check below to see how to set up your node types and appereance on the pallet.
### Types :link:
Go ahead and edit the contents of the [example](./src/node.ts) file inside the `./src` folder:
#### Configuration Interface
* Import the Node-RED module and setup the [properties](https://nodered.org/docs/creating-nodes/properties) of your node. This can be done by creating a configuration interface as follows:
```typescript
import * as NodeRED from "node-red";

interface ExampleNodeConfig extends NodeRED.NodeDef{
    topic:string
}
```
:warning: __You will need to create as many NodeConfig interfaces as the nodes in the file!__
#### Internal logic
* To create the [node's logic](https://nodered.org/docs/creating-nodes/node-js) we will start by making a node function, inside this function we need to create the actual node using Node-RED's API and then you can develop the node's interal logic when it receives input message. Finally you will need to register the type of the node with Node-RED's API. Following is a code snippet for the example node:
```typescript
export = function(RED:NodeRED.NodeAPI){
    .
    .
    .
    // Example Node Function
    function ExampleNode(this:NodeRED.Node, config:ExampleNodeConfig){
      // Create the actual node
      RED.nodes.createNode(this,config);
      // Node input listener
      this.on('input',(msg:any,send,done)=>{
          // This is where you set up your node's internal logic
          
          // Using the Node's configuration variables
          msg.topic = config.topic;
          // Changing the payload of the msg
          msg.payload = msg.payload.message || "Hello from Example Node";
          // Sending out the message
          send(msg);
          // Check if everything is done
          if(done) done();
      });
    }
    // Node is registered with the 'example' type
    RED.nodes.registerType('example',ExampleNode);
    .
    .
    .
}
```
---
### Appearance :scarf:
Go ahead and edit the contents of the [example](./build/node.html) file inside the `./build` folder. Also here is a reference to official documenation regarding the [HTML file](https://nodered.org/docs/creating-nodes/node-html).
* Register your node's type and create it's [appereance](https://nodered.org/docs/creating-nodes/appearance):
```html
<script type="text/javascript" id="node-example">
    RED.nodes.registerType('example',{
        category:'ExamplePallet',
        color:'#e2b784',
        inputs:1,
        outputs:1,   
        icon:"node.svg", 
        defaults: {
            name: {value:''},
            topic: {value:''}
        },
        label: function(){
            return this.name || 'example'
        }
    });
</script>
```
* Create the [edit dialog](https://nodered.org/docs/creating-nodes/edit-dialog) for your node's configuration:
```html
<script type="text/html" data-template-name="example">
    <div class="form-row">
        <label for="node-input-name"><i class="fa fa-tag"></i> Name</label>
        <input type="text" id="node-input-name" placeholder="Name">
    </div>
    <div class="form-row">
        <label for="node-input-topic"><i class="fa fa-cog"></i> Topic</label>
        <input type="text" id="node-input-topic" placeholder="Topic" required>
    </div>
</script>
```
* Create the [help](https://nodered.org/docs/creating-nodes/help-style-guide) dialog and your node's documentation: 
```html
<script type="text/html" data-help-name="example">
  <p>Typescript example Node-RED node</p>
  <h3>Inputs</h3>
  <dl class="message-properties">
  <dt>payload
      <span class="property-type">string</span>
  </dt>
  <h3>Outputs</h3>
  <dl class="message-properties">
  <dt>payload
      <span class="property-type">string</span>
  </dt>
  <h3>Details</h3>
  <p>Some more information about the node.</p>
</script>
```
