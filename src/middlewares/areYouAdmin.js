//사용자의 role이 admin인지 확인
import { userService } from "../services";

async function areYouAdmin(req, res, next) {
  try {
    const userId = req.currentUserId;
    const user = await userService.getUser(userId);
    const userRole = user.role;
    const isAdmin = userRole === "admin" ? true : false;

    req.isAdmin = isAdmin; //req.isAdmin 추가

    next();
  } catch (error) {
    res.status(403).json({
      reason: "admin 미들웨어에서 오류가 났습니다.",
    });
    return;
  }
}

export { areYouAdmin };
