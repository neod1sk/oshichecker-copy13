import { Member, CandidateMember, BattleRecord, CANDIDATE_COUNT, RESULT_COUNT } from "./types";

/**
 * アンケートスコアに基づいてメンバーをスコアリング
 * @param members 全メンバーリスト
 * @param surveyScores ユーザーのアンケート回答スコア（属性ごと）
 * @returns スコア順にソートされた候補メンバー
 */
export function scoreMembersBySurvey(
  members: Member[],
  surveyScores: Record<string, number>
): CandidateMember[] {
  const scored = members.map((member) => {
    // メンバーの属性スコアとユーザーの回答スコアをマッチング
    let surveyScore = 0;
    for (const [key, userScore] of Object.entries(surveyScores)) {
      const memberScore = member.scores[key] || 0;
      surveyScore += memberScore * userScore;
    }

    return {
      member,
      surveyScore,
      appearanceCount: 0,
      winCount: 0,
    };
  });

  // スコア降順でソート
  scored.sort((a, b) => b.surveyScore - a.surveyScore);

  return scored;
}

/**
 * 上位N名の候補を取得
 */
export function getTopCandidates(
  scoredMembers: CandidateMember[],
  count: number = CANDIDATE_COUNT
): CandidateMember[] {
  return scoredMembers.slice(0, count);
}

/**
 * 最終ランキングを計算（勝利数ベース + タイブレーク）
 * 
 * タイブレーク順序:
 * 1) surveyScore（アンケートスコア）が高い方
 * 2) 直接対決で勝った方
 * 3) memberId 昇順
 */
export function calculateFinalRanking(
  candidates: CandidateMember[],
  battleRecords: BattleRecord[]
): CandidateMember[] {
  const sorted = [...candidates].sort((a, b) => {
    // 1. 勝利数で比較
    if (b.winCount !== a.winCount) {
      return b.winCount - a.winCount;
    }

    // 2. アンケートスコアで比較
    if (b.surveyScore !== a.surveyScore) {
      return b.surveyScore - a.surveyScore;
    }

    // 3. 直接対決で比較
    const directBattle = battleRecords.find(
      (record) =>
        (record.memberA === a.member.id && record.memberB === b.member.id) ||
        (record.memberA === b.member.id && record.memberB === a.member.id)
    );
    if (directBattle) {
      if (directBattle.winnerId === a.member.id) return -1;
      if (directBattle.winnerId === b.member.id) return 1;
    }

    // 4. memberId 昇順
    return a.member.id.localeCompare(b.member.id);
  });

  return sorted.slice(0, RESULT_COUNT);
}
