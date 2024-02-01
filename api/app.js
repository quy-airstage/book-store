const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.options("/upload/img", cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    cb(null, timestamp + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

app.post(
  "/upload/img",
  upload.fields([{ name: "productImage", maxCount: 1 }]),
  (req, res, next) => {
    console.log(req.files);
    let name = req.files.productImage[0].path;
    let img = "http://localhost:1210/" + name;
    return res.status(201).json({ img: img });
  }
);

const secretKey = "mybookstore";
app.post("/login", (req, res, next) => {
  let { id, email, role } = req.body;
  console.log(req.body);
  const token = jwt.sign(
    {
      userId: id,
      email: email,
      role: role,
    },
    secretKey,
    {
      expiresIn: "3d",
    }
  );
  return res.status(200).json({ token: token });
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourmail",
    pass: "app-password",
  },
});

async function getUserByEmail(email) {
  let user = null;
  user = await fetch(`http://localhost:3000/user?email=${email}`)
    .then((res) => res.json())
    .then((result) => {
      return result[0];
    });
  return user;
}
app.post("/forgot-password", async (req, res) => {
  const email = req.body.email;
  const user = await getUserByEmail(email);
  console.log(user);
  if (user) {
    const token = jwt.sign(
      { id: user.id, email: user.email, forget: true },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    const resetLink = `http://localhost:4200/login/reset-password/${token}`;

    const mailOptions = {
      from: "yourmail",
      to: email,
      subject: "Quên mật khẩu",
      html: `
      <div style="margin-top: 10%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      <div style="
          box-shadow: rgba(0, 0, 0, 0.8) 0px 1px 4px;
          border: none;
        ">
        <div style=" width: 70%;margin: 0px auto;">
          <div style=" padding: 10px 40px;
            background-color: #4d1ab8;
            color: white;
            font-weight: bold; font-size: 28px;">
            <p>Yêu cầu khôi phục mật khẩu</p>
          </div>
          <div style="padding: 10px 40px;
            color: #787878;font-size: 18px;">
            <p>Xin chào bạn. Tôi là <strong>Admin</strong></p>
            <p>Ai đó đã yêu cầu mật khẩu mới cho tài khoản sau tại website Sách</p>
            <p>Tên đăng nhập: <strong>${user.email}</strong></p>
            <p>
              Nếu bạn không tạo yêu cầu này, hãy bỏ qua email. Nếu muốn thực hiện
            </p>
            <a href="${resetLink}">Ấn vào đây để lấy lại mật khẩu</a>
            <p>Thanks for reading.</p>
          </div>
        </div>
      </div>
    </div> 
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Lỗi lúc gửi." });
      }
      res.json({ message: "Gửi thành công." });
    });
  } else {
    res.status(404).json({ error: "Không tìm thấy tài khoản có email này." });
  }
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message },
  });
});

module.exports = app;
