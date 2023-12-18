import type { ValidationResult } from "remix-validated-form";

export interface MemberArgs {
  email: string;

  password: string;
}
export type Member = {
  member: {
    email: string;
  } | null;
  isMember: boolean;
};
export const createMember = async ({ data }: ValidationResult<MemberArgs>) => {
  try {
    if (!data) {
      throw new Error("Login member");
    }
    const member = await prisma.member.create({ data });
    return member;
  } catch (error) {
    throw new Error("member");
  }
};

export const loginMember = async ({
  data,
}: ValidationResult<MemberArgs>): Promise<Member> => {
  try {
    if (!data) {
      throw new Error("Login member");
    }
    const member = await prisma.member.findUnique({
      where: { email: data.email, password: data.password },
      select: { email: true },
    });

    return { member, isMember: member === null ? false : true };
  } catch (error) {
    throw new Error("Login member");
  }
};
