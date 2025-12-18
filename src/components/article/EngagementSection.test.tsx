import { render, screen, fireEvent } from '@testing-library/react';
import { EngagementSection } from './EngagementSection';

describe('EngagementSection', () => {
  it('renders the engagement section', () => {
    render(<EngagementSection articleId={1} initialLikes={0} />);
    expect(screen.getByText('Share')).toBeInTheDocument();
    expect(screen.getByText('Comments (0)')).toBeInTheDocument();
  });

  it('allows liking a post', () => {
    render(<EngagementSection articleId={1} initialLikes={0} />);
    const likeButton = screen.getByLabelText('Like this article');
    fireEvent.click(likeButton);
    expect(likeButton).toBeDisabled();
  });
});
