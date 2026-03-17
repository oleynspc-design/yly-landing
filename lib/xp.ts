import { getSql } from "./db";
import { getLevelForXp } from "./levels";

export async function grantXp(userId: string, amount: number, source: string, description?: string) {
  const sql = getSql();

  // Log XP
  await sql`
    INSERT INTO xp_log (user_id, amount, source, description)
    VALUES (${userId}::uuid, ${amount}, ${source}, ${description || null})
  `;

  // Update user XP
  const rows = (await sql`
    UPDATE users SET xp = xp + ${amount}, updated_at = NOW()
    WHERE id = ${userId}::uuid
    RETURNING xp
  `) as { xp: number }[];

  if (rows.length > 0) {
    const newXp = rows[0].xp;
    const newLevel = getLevelForXp(newXp);

    // Update level if changed
    await sql`
      UPDATE users SET level = ${newLevel.level}
      WHERE id = ${userId}::uuid AND level < ${newLevel.level}
    `;

    return { xp: newXp, level: newLevel.level };
  }

  return null;
}
