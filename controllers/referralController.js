import prisma from "../prismaClient.js";

export const createReferral = async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, course } =
    req.body;

  try {
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        course,
      },
    });
    res.status(200).json(referral);
  } catch (error) {
    console.error("Error creating referral:", error);
    res.status(500).json({ error: "Failed to create referral" });
  }
};
