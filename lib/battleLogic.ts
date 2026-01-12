import { CandidateMember, BattleRecord } from "./types";

/**
 * 次の対戦ペアを選出
 * 
 * ペアリング方式:
 * 1) 登場回数が最も少ないメンバーを優先
 * 2) 同数の場合、未対戦のペアを優先
 * 3) それでも決まらない場合はランダム
 */
export function selectBattlePair(
  candidates: CandidateMember[],
  battleRecords: BattleRecord[]
): [CandidateMember, CandidateMember] | null {
  if (candidates.length < 2) return null;

  // 登場回数でソート（昇順）
  const sortedByAppearance = [...candidates].sort(
    (a, b) => a.appearanceCount - b.appearanceCount
  );

  // 最小登場回数を持つメンバーを取得
  const minAppearance = sortedByAppearance[0].appearanceCount;
  const leastAppeared = sortedByAppearance.filter(
    (c) => c.appearanceCount === minAppearance
  );

  // 対戦済みペアを記録
  const battledPairs = new Set<string>();
  for (const record of battleRecords) {
    const pairKey = [record.memberA, record.memberB].sort().join("-");
    battledPairs.add(pairKey);
  }

  // ペアを探す
  let memberA: CandidateMember | null = null;
  let memberB: CandidateMember | null = null;

  // 最小登場回数のメンバーから1人目を選ぶ
  for (const candidateA of leastAppeared) {
    // 2人目を探す（未対戦優先）
    const possibleOpponents = sortedByAppearance.filter(
      (c) => c.member.id !== candidateA.member.id
    );

    // 未対戦の相手を探す
    for (const candidateB of possibleOpponents) {
      const pairKey = [candidateA.member.id, candidateB.member.id].sort().join("-");
      if (!battledPairs.has(pairKey)) {
        memberA = candidateA;
        memberB = candidateB;
        break;
      }
    }

    if (memberA && memberB) break;
  }

  // 未対戦ペアが見つからない場合、登場回数が少ない順でランダム選択
  if (!memberA || !memberB) {
    // 登場回数が少ない2人を選ぶ
    memberA = sortedByAppearance[0];
    
    // 2人目は1人目以外で最も登場回数が少ないメンバー
    const remainingCandidates = sortedByAppearance.filter(
      (c) => c.member.id !== memberA!.member.id
    );
    
    // ランダム要素を加える（同じ登場回数の中から）
    const minRemainingAppearance = remainingCandidates[0]?.appearanceCount ?? 0;
    const eligibleForB = remainingCandidates.filter(
      (c) => c.appearanceCount === minRemainingAppearance
    );
    
    memberB = eligibleForB[Math.floor(Math.random() * eligibleForB.length)];
  }

  if (!memberA || !memberB) return null;

  // ランダムで左右を入れ替え
  if (Math.random() > 0.5) {
    return [memberB, memberA];
  }

  return [memberA, memberB];
}

/**
 * バトル結果を記録し、候補リストを更新
 */
export function recordBattleResult(
  candidates: CandidateMember[],
  round: number,
  memberAId: string,
  memberBId: string,
  winnerId: string
): { updatedCandidates: CandidateMember[]; record: BattleRecord } {
  const record: BattleRecord = {
    round,
    memberA: memberAId,
    memberB: memberBId,
    winnerId,
  };

  const updatedCandidates = candidates.map((c) => {
    if (c.member.id === memberAId || c.member.id === memberBId) {
      return {
        ...c,
        appearanceCount: c.appearanceCount + 1,
        winCount: c.member.id === winnerId ? c.winCount + 1 : c.winCount,
      };
    }
    return c;
  });

  return { updatedCandidates, record };
}
