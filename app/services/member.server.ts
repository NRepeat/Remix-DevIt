type MemberArgs = {
  email: string;
  password: string;
};
export type Member = {
  id: number;
  email: string;
};
export const createMember = async (data: MemberArgs): Promise<Member> => {
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

export const findMember = async (data: MemberArgs): Promise<Member | null> => {
  try {
    const member = await prisma.member.findUnique({
      where: { email: data.email, password: data.password },
    });
    return member;
  } catch (error) {
    throw new Error("Error while sign in customer");
  }
};
