const { response } = require('express');
const HistoryBomba = require('../../../models/HistoryBomba');


const getEb1BHistorial = async (req, res = response) => {

    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: '1B', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });

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

const getEbApendiceHistorial = async (req, res = response) => {

    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: 'APN', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });

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

const getEbCamarpasaHistorial = async (req, res = response) => {

    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: 'CMP', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });

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

const getEbDePescaHistorial = async (req, res = response) => {

    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: 'DP', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });

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

const getEbPanamaoHistorial = async (req, res = response) => {
    try {
        const { fecha_Inicio, fecha_Fin } = req.body;
        const historial = await HistoryBomba.find({ estacion: 'PNM', date:{ $gte: fecha_Inicio, $lte: fecha_Fin }  });

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
    getEb1BHistorial,
    getEbApendiceHistorial,
    getEbCamarpasaHistorial,
    getEbDePescaHistorial,
    getEbPanamaoHistorial,
}