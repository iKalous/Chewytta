package web.project.chewytta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.project.chewytta.mapper.BlindBoxMapper;
import web.project.chewytta.model.BlindBox;

import java.util.List;

@Service
public class BlindBoxService {

    @Autowired
    private BlindBoxMapper blindBoxMapper;

    // 获取所有盲盒
    public List<BlindBox> getAllBoxes() {
        return blindBoxMapper.selectAllBoxes();
    }

    // 根据ID获取盲盒详情
    public BlindBox getBoxById(Long id) {
        return blindBoxMapper.selectBoxById(id);
    }

    // 添加新盲盒
    public int addBlindBox(BlindBox blindBox) {
        return blindBoxMapper.insertBox(blindBox);
    }

    // 更新盲盒信息
    public int updateBlindBox(BlindBox blindBox) {
        return blindBoxMapper.updateBox(blindBox); // 明确调用 updateBox
    }

    // 删除盲盒
    public int deleteBlindBox(Long id) {
        return blindBoxMapper.deleteBox(id);
    }

    public List<BlindBox> searchBoxesByName(String keyword) {
        return blindBoxMapper.searchBoxesByName(keyword);
    }

}
