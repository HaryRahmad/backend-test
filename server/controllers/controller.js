const { where, Op } = require("sequelize");
const { Book, Member, Borrow, Pinalty } = require("../models");

class Controller {
  static async getBook(req, res) {
    try {
      let data = await Book.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          stock: {
            [Op.gt]: 0,
          },
        },
      });
      // console.log(data);
      res.status(200).json(data);
    } catch (error) {
      if (
        error.name === `SequelizeConstraintError` ||
        error.name === `SequelizeValidationError`
      ) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: `internal server error` });
      }
    }
  }
  static async getMember(req, res) {
    try {
      let data = await Member.findAll({
        include: {
          model: Borrow,
          where: {
            status: `borrowed`,
          },
          required: false,
        },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      });
      //   console.log(data,`-----------------`);
      let getmuchBorrow = data.map((el) => {
        return {
          name: el.name,
          code: el.code,
          totalBorrow: el.Borrows.length,
        };
      });
      res.status(200).json(getmuchBorrow);
      return getmuchBorrow;
    } catch (error) {
      console.log(error);

      if (
        error.name === `SequelizeConstraintError` ||
        error.name === `SequelizeValidationError`
      ) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: `internal server error` });
      }
    }
  }
  static async memberBorrow(req, res) {
    try {
      let { codeMembers, codeBooks } = req.body;
      let checkMember = await Member.findOne({ where: { code: codeMembers } });
      let chechBook = await Book.findOne({ where: { code: codeBooks } });
      let checkBorrow = await Borrow.findAll({
        where: { codeMembers: codeMembers, status: "borrowed" },
      });
      let date = new Date();
      console.log(checkMember.id, `-----------------`);

      if (!checkMember) {
        throw { name: `member not found` };
      } else {
        let checkPinalty = await Pinalty.findAll({
          where: { memberId: checkMember.id },
        });
        if (checkPinalty) {
          let calculate = date - checkBorrow.createdAt;
          if (Math.floor(calculate / (1000 * 60 * 60 * 24)) > 3) {
            throw { name: `pinalty` };
          }
        }
      }
      if (!chechBook) {
        throw { name: `book not found` };
      }
      if (checkBorrow.length >= 2) {
        throw { name: `borrowgt2` };
      }
      await Book.update(
        { stock: chechBook.stock - 1 },
        { where: { code: codeBooks } }
      );
      let data = await Borrow.create({
        codeMembers,
        codeBooks,
        status: `borrowed`,
      });
      res.status(201).json({
        message: `user ${checkmember.name} success borrow book ${chechBook.title}`,
      });
    } catch (error) {
      console.log(error);
      if (
        error.name === `SequelizeConstraintError` ||
        error.name === `SequelizeValidationError`
      ) {
        res.status(400).json({ message: error.message });
      } else if (error.name === `member not found`) {
        res.status(404).json({ message: `member not found` });
      } else if (error.name === `book not found`) {
        res.status(404).json({ message: `book not found` });
      } else if (error.name === `borrowgt2`) {
        res.status(400).json({ message: `member has borrowed 2 books` });
      } else if (error.name === `pinalty`) {
        res.status(400).json({ message: `you in pinalty` });
      } else {
        res.status(500).json({ message: `internal server error` });
      }
    }
  }
  static async returnBook(req, res) {
    try {
      let { id, memberId } = req.body;
      //untuk memberId biasanya didapatkan dari midleware(req.user) seperti saat login tetapi saat ini saya tidak menggunakan midleware oleh karena itu saya menggunakan req.body
      let checkBorrow = await Borrow.findOne({ where: { id } });
      let checkBook = await Book.findOne({
        where: { code: checkBorrow.codeBooks },
      });
      let newdate = new Date();
      let calculate = newdate - checkBorrow.createdAt;
    //   console.log(checkBook.stock, `-----------------`);

      if (!checkBorrow) {
        throw { name: `borrow not found` };
      }
      if (checkBorrow.status === `returned`) {
        throw { name: `book already returned` };
      }
      //   console.log(Math.floor(calculate / (1000 * 60 * 60 * 24),`-----------------`));
      if (Math.floor(calculate / (1000 * 60 * 60 * 24)) > 7) {
        await Pinalty.create({
          memberId: memberId,
          borrowId: id,
          pinaltyEnd: new Date(newdate.setDate(newdate.getDate() + 3)),
        });
        await Borrow.update({ status: `returned` }, { where: { id } });
        await Book.update(
          { stock: checkBook.stock + 1 },
          { where: { code: checkBorrow.codeBooks } }
        );
        res
          .status(200)
          .json({ message: `you got pinalty returned after more than 7 days` });
      } else {
        await Borrow.update({ status: `returned` }, { where: { id } });
        await Book.update(
          { stock: checkBook.stock + 1 },
          { where: { code: checkBorrow.codeBooks } }
        );
        res.status(200).json({ message: `book has been returned` });
      }
    } catch (error) {
      console.log(error);

      if (
        error.name === `SequelizeConstraintError` ||
        error.name === `SequelizeValidationError`
      ) {
        res.status(400).json({ message: error.message });
      } else if (error.name === `borrow not found`) {
        res.status(404).json({ message: `borrow not found` });
      } else if (error.name === `book already returned`) {
        res.status(400).json({ message: `book already returned` });
      } else {
        res.status(500).json({ message: `internal server error` });
      }
    }
  }
}
module.exports = Controller;
