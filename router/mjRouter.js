const express = require("express");
const db = require("../db");
const router = express.Router();

 router.get("/list", (req, res) => {
     const selectQuery = `
         SELECT  *
         FROM    user
        
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

router.post("/get/one", (req, res, next) => {
    
    const { userId } = req.body;
    console.log(userId, "aa");
    const selectQuery = `
    SELECT  id,
            username,
            avatar,
            birth,
            mag,
            mode,
            DATE_FORMAT(createdAt, "%Y년 %m월 %d일") As createdAT,
            DATE_FORMAT(updatteAt, "%Y년 %m월 %d일") As updatteAT
      FROM  mj.user
    WHERE   id = ${userId}
    `;
    
    try {
        db.query(selectQuery, (error, rows) => {
            if(error) {
                console.error(error)
                throw "데이터베이스 접근 에러 발생";
            }
            if(rows.length < 1) {
                throw "사용자 정보가 존재하지 않습니다.";
            }
            return res.status(200).json(rows[0]);//1명의 데이터
        });
    
    } catch (error){
        console.error(error);
        return res.status(401).send("데이터를 불러올 수 없습니다.");
    } 
});


router.post("/get/friends", (req, res, next) => {
    const { userId } = req.body;
    
  
    const selectQuery = `
          SELECT  id,
                  username,
                  avatar
          FROM    user
          WHERE   id  in (
              SELECT  followerId
              FROM    follow
              WHERE   followingId = ${userId}
          )
      `;
    try {
      db.query(selectQuery, (err, row) => {
        if (err) {
          console.error(err);
          throw "사용자를 불러올 수 없습니다.";
        }
  
        if (row.length < 1) {
          throw "사용자 정보가 존재하지 않습니다.";
        }
  
        console.log(row);
        return res.status(200).json(row);
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send("데이터 베이스 오류 발생");
    }
  });


  router.post("/get/feedle", (req, res, next) => {
    const { userId } = req.body;
  
    const selectQuery = `
        SELECT  id,
                content,
                imgurl,
                createdAt,
                userid
        FROM    feedle
        WHERE   userid <> ${userId}
        AND     isDelete = 0
        ORDER BY createdAt DESC;
      `;

    try {
      db.query(selectQuery, (err, row) => {
        if (err) {
          console.error(err);
          throw "사용자를 불러올 수 없습니다.";
        }
  
        if (row.length < 1) {
          throw "사용자 정보가 존재하지 않습니다.";
        }
  
        console.log(row);
        return res.status(200).json(row);
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send("데이터 베이스 오류 발생");
    }
  });


module.exports = router;