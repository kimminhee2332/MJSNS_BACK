const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/list", (req, res) => {
    const selectQuery = `
        SELECT  *
        FROM    user;
        
    `;
    try {
        db.query(selectQuery, (error, rows) => {
            if(error) {
                console.log(error)
                
            return res.status(401).send("데이터베이스 접근 에러 발생");
            }
            return res.status(200).json(rows);
        });
    
    } catch (error){
        console.error(error);
        return res.status(401).send("데이터를 불러올 수 없습니다.");
    } 
});

module.exports = router;