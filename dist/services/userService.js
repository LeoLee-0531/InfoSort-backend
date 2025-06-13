"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.getUserByLineUserIdService = exports.getAllUsersService = exports.createUserService = void 0;
const client_1 = require("@prisma/client");
const errorHandler_1 = require("../middleware/errorHandler");
const prisma = new client_1.PrismaClient();
const createUserService = (lineUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma.user.findUnique({
        where: { lineUserId },
    });
    if (existingUser) {
        throw new errorHandler_1.HttpError(409, `User with lineUserId '${lineUserId}' already exists.`);
    }
    return prisma.user.create({
        data: {
            lineUserId,
        },
    });
});
exports.createUserService = createUserService;
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findMany({
        include: {
            informationItems: true, // Include related information items
        },
    });
});
exports.getAllUsersService = getAllUsersService;
const getUserByLineUserIdService = (lineUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { lineUserId },
        include: {
            informationItems: true, // Include related information items
        },
    });
    if (!user) {
        throw new errorHandler_1.HttpError(404, `User with lineUserId '${lineUserId}' not found.`);
    }
    return user;
});
exports.getUserByLineUserIdService = getUserByLineUserIdService;
// Update service might not be strictly necessary if only lineUserId and createdAt exist
// and createdAt is auto-generated. However, if other fields are added later,
// this structure can be expanded.
// For now, an update operation on a User might not make sense if only lineUserId is mutable
// and it's the ID. If other mutable fields are added, this can be implemented.
/*
export const updateUserService = async (lineUserId: string, data: Partial<Omit<User, 'lineUserId' | 'createdAt'>>): Promise<User | null> => {
  const user = await prisma.user.update({
    where: { lineUserId },
    data,
  });
  if (!user) {
    throw new HttpError(404, `User with lineUserId '${lineUserId}' not found for update.`);
  }
  return user;
};
*/
const deleteUserService = (lineUserId) => __awaiter(void 0, void 0, void 0, function* () {
    // Consider implications of deleting a user, e.g., cascading deletes for InformationItems
    // Prisma schema does not specify onDelete behavior for User -> InformationItem relation from User side.
    // By default, Prisma prevents deletion if related records exist.
    // Handle this by either deleting related items first or adjusting schema.
    // For now, we assume related items should not block deletion or are handled by DB/Prisma settings.
    const informationItems = yield prisma.informationItem.findMany({
        where: { userId: lineUserId },
    });
    if (informationItems.length > 0) {
        // Option 1: Delete associated InformationItems
        // await prisma.informationItem.deleteMany({
        //   where: { userId: lineUserId },
        // });
        // Option 2: Throw an error or handle as per application logic
        throw new errorHandler_1.HttpError(409, `User '${lineUserId}' cannot be deleted as they have associated information items. Please delete them first.`);
    }
    const user = yield prisma.user.delete({
        where: { lineUserId },
    });
    // No need to check if (!user) because Prisma throws P2025 if record to delete is not found.
    return user;
});
exports.deleteUserService = deleteUserService;
