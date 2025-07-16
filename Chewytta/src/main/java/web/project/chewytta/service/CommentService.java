package web.project.chewytta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.project.chewytta.mapper.CommentMapper;
import web.project.chewytta.model.Comment;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentMapper commentMapper;

    public List<Comment> getCommentsByBoxId(Long boxId) {
        return commentMapper.selectByBoxId(boxId);
    }

    public int addComment(Comment comment) {
        return commentMapper.insertComment(comment);
    }

    public int removeComment(Long id) {
        return commentMapper.deleteById(id);
    }
}
