import logger  from "pino";
import dayjs from "dayjs";

const log = logger({
    // prettyPrint:true,  No longer available use transport instead
    transport: {
        target: 'pino-pretty'
      },
    base:{
        pid:false
    },
    timestamp: ()=> `,"time":"${dayjs().format()}"`,

})
export default log;
