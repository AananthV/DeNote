![](public/denote_logo.png)

# DeNote
Productivity focussed real time note taking application with a keyboard first approach for quick editing.

If you're here for a [Delta Winter of Code](https://dwoc.io) project, check out the [Contributor's Guide](https://github.com/AananthV/DeNote/wiki/Contributor's-Guide) in the Wiki.

## Preparation
### Prerequisites
Install [node v12.19.0](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Set-Up 
- Copy a version of DeNote: `git clone https://github.com/AananthV/DeNote.git`
- Install Dependencies: `npm install`
- Configure App
    - Copy default.example.json to default.json: `cp default.example.json default.json`
    - Set db url and session in default.json

### Running
- To run Development: `npm run dev`
- To run Production
    - Building the application: `npm run build`
    - Start server: `npm run start`
- Using any browser, open http://localhost:8000