export function addTopic(store, topic) {
  const cleanTopic = { ...topic, id: `topic-${Date.now()}`, questions: topic.questions || [] };
  store.update((state) => ({ ...state, topics: [...state.topics, cleanTopic], player: { ...state.player, points: state.player.points + 25 } }));
  return cleanTopic;
}

export function addQuestion(store, topicId, question) {
  store.update((state) => ({ ...state, topics: state.topics.map((topic) => topic.id === topicId ? { ...topic, questions: [...topic.questions, { ...question, id: `question-${Date.now()}` }] } : topic), player: { ...state.player, points: state.player.points + 5 } }));
}
