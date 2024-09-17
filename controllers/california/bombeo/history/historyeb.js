const { response } = require('express');
const HistoryBomba = require('../../../../models/HistoryBomba');


const getEbPrecSantaMonicaHistorial = async (req, res = response) => {
    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: 'PSM', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });
        

        if (historial.length == 0) {
            return res.status(400).json({ 
                ok: false,
                message: 'No hay rigistros para esta estacion de bombeo'
            });
        }
        res.status(200).json(historial); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error en el servidor'
        });
    }
};

const getEbSanDiegoHistorial = async (req, res = response) => {
    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: 'SD', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });

        if (historial.length == 0) {
            return res.status(400).json({ 
                ok: false,
                message: 'No hay rigistros para esta estacion de bombeo'
            });
        }
        res.status(200).json(historial); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error en el servidor'
        });
    }
};

const getEbSanFransciscoHistorial = async (req, res = response) => {
    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: 'SF', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });

        if (historial.length == 0) {
            return res.status(400).json({ 
                ok: false,
                message: 'No hay rigistros para esta estacion de bombeo'
            });
        }
        res.status(200).json(historial); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error en el servidor'
        });
    }
};

const getEbSantaBarbaraHistorial = async (req, res = response) => {
    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: 'SB', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });

        if (historial.length == 0) {
            return res.status(400).json({ 
                ok: false,
                message: 'No hay rigistros para esta estacion de bombeo'
            });
        }
        res.status(200).json(historial); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error en el servidor'
        });
    }
};

const getEbSantaMonicaAHistorial = async (req, res = response) => {
    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: 'SMA', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });

        if (historial.length == 0) {
            return res.status(400).json({ 
                ok: false,
                message: 'No hay rigistros para esta estacion de bombeo'
            });
        }
        res.status(200).json(historial); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error en el servidor'
        });
    }
};

const getEbSantaRosaAHistorial = async (req, res = response) => {
    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: 'SRA', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });

        if (historial.length == 0) {
            return res.status(400).json({ 
                ok: false,
                message: 'No hay rigistros para esta estacion de bombeo'
            });
        }
        res.status(200).json(historial); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error en el servidor'
        });
    }
};

const getEbSantaRosaBHistorial = async (req, res = response) => {
    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: 'SRB', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });

        if (historial.length == 0) {
            return res.status(400).json({ 
                ok: false,
                message: 'No hay rigistros para esta estacion de bombeo'
            });
        }
        res.status(200).json(historial); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error en el servidor'
        });
    }
};

module.exports = {
    getEbPrecSantaMonicaHistorial,
    getEbSanDiegoHistorial,
    getEbSanFransciscoHistorial,
    getEbSantaBarbaraHistorial,
    getEbSantaMonicaAHistorial,
    getEbSantaRosaAHistorial,
    getEbSantaRosaBHistorial,
}