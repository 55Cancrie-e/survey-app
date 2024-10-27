import styled from 'styled-components';

export const QuestionBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 40px;
    max-width: 330px;
`

export const QuestionButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Button = styled.button<{ active?: boolean }>`
  background: ${({ active, theme }) => (active ? 'linear-gradient(90deg, #432371, #7f1bc3)' : theme.buttonBackground)};
  color: ${({ active, theme }) => (active ? '#fff' : theme.buttonText)};
  border: none;
  border-radius: 16px;
  padding: 12px 20px;
  width: 330px;
  min-height: 64px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;

  // Add shadow and transition
  box-shadow: ${({ active }) =>
    active ? '0px 5px 10px rgba(0, 0, 0, 0.15)' : '0px 2px 5px rgba(0, 0, 0, 0.1)'};

  &:hover {
    background: ${({ active }) =>
      active ? 'linear-gradient(90deg, #5e2d9d, #a52eff)' : '#e0e7ff'};
    box-shadow: ${({ active }) =>
      active ? '0px 8px 15px rgba(0, 0, 0, 0.2)' : '0px 3px 7px rgba(0, 0, 0, 0.12)'};
  }
`;


export const QuestionText = styled.h1`
    font-weight: 700;
    font-size: 24px;
    font-family: sans-serif;
    color: ${({ theme }) => (theme.text)};
`

export const QuestionSubText = styled.p`
  font-weight: 400;
    font-size: 14px;
    font-family: sans-serif;
    color: ${({ theme }) => (theme.text)};
`

export const ResultListItem = styled.li`
  color: black;
  margin: 10px 0;
`