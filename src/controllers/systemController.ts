import os from "os";
import {Request, Response} from "express";

export const getSystemMetrics = (req: Request, res: Response): void => {
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const usedMemory = totalMemory - freeMemory;

    res.status(200).json({
        status: 'Healthy',
        uptime: {
            nodeSeconds: Math.floor(process.uptime()),
            osSeconds: Math.floor(os.uptime()),
        },
        memory : {
            totalMB: (totalMemory/1024/1024).toFixed(2),
            usedMB: (usedMemory/1024/1024).toFixed(2),
            freeMB: (freeMemory/1024/1024).toFixed(2),
        },
        cpu: {
            cores: os.cpus().length,
            model: os.cpus()[0].model,
            loadAverage: os.loadavg(),
        },
    });
}
