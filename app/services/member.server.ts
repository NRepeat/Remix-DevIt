type MemberLoginArgs = {
  email: string;
  password: string;
};
type MemberFindArgs = {
  email: string;
  password?: string;
};
export type Member = {
  id: number;
  email: string;
};
export const createMember = async (data: MemberLoginArgs): Promise<Member> => {
  try {
    const member = await prisma.member.create({
      data,
      select: { id: true, email: true },
    });
    return member;
  } catch (error) {
    throw new Error("Error while creating member");
  }
};

export const loginMember = async (
  data: MemberLoginArgs
): Promise<Member | null> => {
  try {
    const member = await prisma.member.findUnique({
      where: { email: data.email, password: data.password },
    });
    return member;
  } catch (error) {
    throw new Error("Error while sign in customer");
  }
};
export const findMember = async (
  data: MemberFindArgs
): Promise<Member | null> => {
  try {
    const member = await prisma.member.findFirst({
      where: {
        OR: [
          { email: { contains: data.email } },
          { password: { contains: data.password } },
        ],
      },
    });
    return member;
  } catch (error) {
    throw new Error("Error while sign in customer");
  }
};
