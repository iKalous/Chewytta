package web.project.chewytta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.project.chewytta.mapper.BlindBoxMapper;
import web.project.chewytta.mapper.ItemMapper;
import web.project.chewytta.model.BlindBox;
import web.project.chewytta.model.Item;

import java.util.List;

@Service
public class AdminBoxService {

    @Autowired
    private BlindBoxMapper blindBoxMapper;

    @Autowired
    private ItemMapper itemMapper;

    /**
     * 获取所有盲盒及其款式
     */
    public List<BlindBox> getAllBlindBoxWithItems() {
        List<BlindBox> boxes = blindBoxMapper.selectAllBoxes();
        for (BlindBox box : boxes) {
            box.setItems(itemMapper.selectByBoxId(box.getId()));
        }
        return boxes;
    }


    /**
     * 添加盲盒及其包含的款式（事务控制）
     */

    @Transactional(rollbackFor = Exception.class)
    public int addBlindBoxWithItems(BlindBox blindBox, List<Item> items) {
        // 插入盲盒
        int boxResult = blindBoxMapper.insertBox(blindBox);

        // 设置每个款式的 boxId 为刚刚插入的盲盒 ID
        for (Item item : items) {
            item.setBoxId(blindBox.getId());
        }

        // 批量插入款式
        int itemResult = itemMapper.insertItems(items); // 需要批量插入方法支持

        return boxResult + itemResult;
    }

    /**
     * 更新盲盒信息及其款式
     */
    @Transactional(rollbackFor = Exception.class)
    public int updateBlindBoxWithItems(BlindBox blindBox, List<Item> items) {
        int boxResult = blindBoxMapper.updateBox(blindBox);

        // 先删除原有款式
        itemMapper.deleteByBoxId(blindBox.getId());

        // 插入新款式
        for (Item item : items) {
            item.setBoxId(blindBox.getId());
        }
        int itemResult = itemMapper.insertItems(items);

        return boxResult + itemResult;
    }

    /**
     * 删除盲盒及其所有关联款式
     */
    @Transactional(rollbackFor = Exception.class)
    public int deleteBlindBoxWithItems(Long id) {
        // 删除款式
        itemMapper.deleteByBoxId(id);
        // 删除盲盒
        return blindBoxMapper.deleteBox(id);
    }

    /**
     * 获取盲盒详情（包括其款式）
     */
    public BlindBox getBlindBoxWithItemsById(Long id) {
        BlindBox box = blindBoxMapper.selectBoxById(id);
        if (box != null) {
            box.setItems(itemMapper.selectByBoxId(id));
        }
        return box;
    }
}
