export function addTopic(store, topic) {
  const cleanTopic = { ...topic, id: `topic-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, questions: topic.questions || [] };
  store.update((state) => ({ ...state, topics: [...state.topics, cleanTopic], player: { ...state.player, points: state.player.points + 25 + cleanTopic.questions.length * 5 } }));
  return cleanTopic;
}

export function addQuestion(store, topicId, question) {
  store.update((state) => ({ ...state, topics: state.topics.map((topic) => topic.id === topicId ? { ...topic, questions: [...topic.questions, { ...question, id: `question-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }] } : topic), player: { ...state.player, points: state.player.points + 5 } }));
}
