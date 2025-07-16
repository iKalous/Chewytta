package web.project.chewytta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.project.chewytta.mapper.DrawnBoxMapper;
import web.project.chewytta.mapper.ItemMapper;
import web.project.chewytta.model.DrawnBox;
import web.project.chewytta.model.Item;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;

@Service
public class DrawnBoxService {

    @Autowired
    private ItemMapper itemMapper;

    @Autowired
    private DrawnBoxMapper drawnBoxMapper;

    public Item drawItemFromBox(Long userId, Long boxId) {
        List<Item> items = itemMapper.selectByBoxId(boxId);
        if (items.isEmpty()) return null;

        Random random = new Random();
        Item selectedItem = items.get(random.nextInt(items.size()));

        DrawnBox drawnBox = new DrawnBox();
        drawnBox.setUserId(userId);
        drawnBox.setBoxId(boxId);
        drawnBox.setItemId(selectedItem.getId());
        drawnBoxMapper.insertDrawnBox(drawnBox);

        return selectedItem;
    }

    @Autowired
    private UserService userService;

    /**
     * 抽取盲盒并扣除余额
     */
    @Transactional(rollbackFor = Exception.class)
    public Item drawItemFromBoxWithDeduction(Long userId, Long boxId, BigDecimal price) {
        // 先扣除余额
        userService.deductBalance(userId, price);

        // 再执行抽取逻辑
        return drawItemFromBox(userId, boxId);
    }


    public List<DrawnBox> getDrawnBoxesByUserId(Long userId) {
        return drawnBoxMapper.selectByUserId(userId);
    }

    /**
     * 获取用户的所有订单（带盲盒和款式详情）
     */
    public List<DrawnBox> getOrdersByUserId(Long userId) {
        return drawnBoxMapper.selectByUserIdWithDetails(userId);
    }

}
