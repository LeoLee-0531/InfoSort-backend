import { Request, Response, NextFunction } from 'express';

// 定義自訂的 HttpError 類別
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    // 明確設定原型以確保 instanceof 正常運作
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export const errorHandler = (
  err: Error | HttpError, // 允許 err 為 HttpError 類型
  _req: Request,
  res: Response,
  _next: NextFunction // _next 已宣告但未使用，這對於 Express 錯誤處理器是正常的
) => {
  console.error(err.stack); // 記錄完整的錯誤堆疊

  // 處理 JSON 解析錯誤
  if (err instanceof SyntaxError && err.message.includes('JSON')) {
    return res.status(400).json({
      error: '請求格式錯誤',
      message: '請求內容的 JSON 格式無效'
    });
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: err.name, // 或者使用更通用的錯誤標題
      message: err.message,
    });
  } else {
    // 處理一般錯誤
    res.status(500).json({
      error: '內部伺服器錯誤',
      message: process.env.NODE_ENV === 'development' ? err.message : '發生未預期的錯誤',
    });
  }
};