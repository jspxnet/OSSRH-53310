package jspx.example.dao.impl;

import com.github.jspxnet.sioc.annotation.Bean;
import com.github.jspxnet.sober.Criteria;
import com.github.jspxnet.sober.SqlMapClient;
import com.github.jspxnet.sober.TableModels;
import com.github.jspxnet.sober.criteria.Order;
import com.github.jspxnet.sober.criteria.expression.Expression;
import com.github.jspxnet.sober.criteria.expression.InExpression;
import com.github.jspxnet.sober.criteria.projection.Projections;
import com.github.jspxnet.sober.jdbc.JdbcOperations;
import com.github.jspxnet.sober.ssql.SSqlExpression;
import com.github.jspxnet.utils.ArrayUtil;
import com.github.jspxnet.utils.StringUtil;
import jspx.example.dao.VoteDAO;
import jspx.example.env.DemoIoc;
import jspx.example.table.VoteItem;
import jspx.example.table.VoteTopic;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;


/**
 *
 * 一个标准的DAO例子
 *
 *  @Bean 表示ioc容器注入 ,调用使用 VoteDAO.class ,命名空间是 DemoIoc.namespace
 *
 *  演示大部分的用法
 *
 */
@Bean(bind = VoteDAO.class,namespace = DemoIoc.namespace)
public class VoteDAOImpl extends JdbcOperations implements VoteDAO {
    final private static Logger log = LoggerFactory.getLogger(VoteDAOImpl.class);

    public VoteDAOImpl() {

    }



    /**
     * 得到一个投票的投票总数
     *
     * @param topicId 投票id
     * @return int
     */
    @Override
    public int getSumVotePoint(String topicId) {
        if (StringUtil.isEmpty(topicId)) {
            return 1;
        }
        int x = (Integer) createCriteria(VoteItem.class)
                .add(Expression.eq("topicId", topicId))
                .setProjection(Projections.sum("votePoint")).uniqueResult();
        if (x <= 0) {
            return 1;
        }
        return x;
    }


    /**
     * @param topicId 得到ID定影的投票
     * @return VoteTopic
     */
    @Override
    public VoteTopic getVoteTopic(String topicId) {
        return get(VoteTopic.class, topicId, true);
    }

    /**
     * @param groupId 得到ID定影的投票
     * @return VoteTopic
     */
    @Override
    public List<VoteTopic> getVoteTopicForGroupId(String groupId) {
        Criteria criteria = createCriteria(VoteTopic.class).add(Expression.eq("groupId", groupId));

        return criteria.list(true);
    }


    /**
     * 得到第一个投票
     *
     * @return VoteTopic
     */
    @Override
    public VoteTopic getFirstVoteTopic(String groupId) {
        Criteria criteria = createCriteria(VoteTopic.class);
        if (!StringUtil.isNull(groupId) && !"*".equals(groupId)) {
            criteria = criteria.add(Expression.eq("groupId", groupId));
        }

        VoteTopic v = criteria.addOrder(Order.desc("sortType"))
                .addOrder(Order.desc("sortDate"))
                .addOrder(Order.desc("createDate"))
                .objectUniqueResult(true);
        if (v == null) {
            v = new VoteTopic();
            v.setTopicText("NO Vote");
        }
        return v;
    }


    /**
     * 得到投票列表
     *
     * @param topicId 主题id
     * @return List
     */
    @Override
    public List<VoteItem> getVoteList(String topicId) {
        if (StringUtil.isEmpty(topicId)) return new ArrayList<VoteItem>();
        return createCriteria(VoteItem.class).add(Expression.eq("topicId", topicId))
                .addOrder(Order.asc("sortType")).list(false);
    }

    /**
     * @param voteIds 投票
     * @return boolean
     */
    @Override
    public boolean postVote(String[] voteIds) throws Exception {
        if (ArrayUtil.isEmpty(voteIds)) {
            return false;
        }
        InExpression inExpression = new InExpression(getSoberTable(VoteItem.class).getPrimary(), voteIds);
        String sql = "UPDATE " + getSoberTable(VoteItem.class).getName() + " SET votePoint=votePoint+1 WHERE " + inExpression.toSqlString(getSoberTable(VoteItem.class), getSoberFactory().getDatabaseName());
        return update(sql, inExpression.getParameter(getSoberTable(VoteItem.class))) >= 0;
    }

    /**
     * 删除
     *
     * @param topicId 主题id
     * @return boolean
     */
    @Override
    public boolean deleteVote(String topicId) {
        if (StringUtil.isEmpty(topicId)) {
            return false;
        }
        try {
            /////////////删除投票begin
            super.delete(VoteTopic.class, topicId, true);
            /////////////删除投票end

            /////////////删除投票选项begin
            super.delete(VoteItem.class, "topicId", topicId);
            /////////////删除投票选项end
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public boolean deleteVote(String[] topicIds) {
        if (ArrayUtil.isEmpty(topicIds)) {
            return false;
        }
        try {
            for (String topicId : topicIds) {
                if (StringUtil.isEmpty(topicId)) {
                    continue;
                }
                /////////////删除投票begin
                super.delete(VoteTopic.class, topicId, true);
                /////////////删除投票end

                /////////////删除投票选项begin
                super.delete(VoteItem.class, "topicId", topicId);
                /////////////删除投票选项end
            }
        } catch (Exception e) {
            log.error(ArrayUtil.toString(topicIds, StringUtil.COMMAS), e);
            return false;
        }
        return true;
    }

    /**
     * 排序
     *
     * @param topicIds 主题id
     * @param sortType 排序
     * @return boolean
     */
    @Override
    public boolean updateSortType(String[] topicIds, int sortType) {
        if (ArrayUtil.isEmpty(topicIds)) {
            return true;
        }
        try {
            for (String topicId : topicIds) {
                if (StringUtil.isEmpty(topicId)) {
                    continue;
                }
                VoteTopic votetopic =  get(VoteTopic.class, topicId);
                if (votetopic == null) {
                    continue;
                }
                votetopic.setSortType(sortType);
                super.update(votetopic, new String[]{"sortType"});
            }

        } catch (Exception e) {
            log.error(ArrayUtil.toString(topicIds, StringUtil.COMMAS), e);
            return false;
        }
        return true;
    }

    /**
     * 提前
     *
     * @param topicIds 主题id
     * @return boolean
     */
    @Override
    public boolean updateSortDate(String[] topicIds) {
        if (null == topicIds) {
            return true;
        }
        try {
            for (String topicId : topicIds) {
                if (StringUtil.isEmpty(topicId)) {
                    continue;
                }
                VoteTopic votetopic =  get(VoteTopic.class, topicId);
                if (votetopic == null) {
                    continue;
                }
                votetopic.setSortDate(new Date());
                update(votetopic, new String[]{"sortDate"});
            }

        } catch (Exception e) {
            log.error(ArrayUtil.toString(topicIds, StringUtil.COMMAS), e);
            return false;
        }
        return true;
    }


    /**
     * @param find       询字符串 "" 自动分开查询
     * @param term       条件
     * @param sortString 排序字符串
     * @param uid        用户ID
     * @param groupId    分组
     * @param ipage      页数
     * @param count      返回数量
     * @return 主题列表
     * @throws Exception 异常
     */
    @Override
    public List<VoteTopic> getList(
            String find,
            String term,
            String sortString,
            long uid,
            String groupId,
            int ipage, int count) throws Exception {
        Criteria criteria = createCriteria(VoteTopic.class);
        if (!StringUtil.isNull(find)) {

            criteria = criteria.add(Expression.like("topicText", "%" + StringUtil.checkSql(find) + "%"));
        }
        if (uid > 0) {
            criteria = criteria.add(Expression.eq("putUid", uid));
        }
        if (!StringUtil.isNull(groupId) && !"*".equals(groupId)) {
            criteria = criteria.add(Expression.eq("groupId", groupId));
        }
        criteria = SSqlExpression.getTermExpression(criteria, term);
        criteria = SSqlExpression.getSortOrder(criteria, sortString);
        return criteria.setCurrentPage(ipage).setTotalCount(count).list(false);
    }


    /**
     * @param find    查询
     * @param term    条件
     * @param uid     用户id
     * @param groupId 分组
     * @return 得到记录条数
     * @throws Exception 异常
     */
    @Override
    public int getCount(
            String find,
            String term,
            long uid,
            String groupId
    ) throws Exception {
        Criteria criteria = createCriteria(VoteTopic.class);
        if (!StringUtil.isNull(find)) {
            criteria = criteria.add(Expression.like("topicText", "%" + StringUtil.checkSql(find) + "%"));
        }

        if (uid > 0) {
            criteria = criteria.add(Expression.eq("putUid", uid));
        }
        if (!StringUtil.isNull(groupId) && !"*".equals(groupId)) {
            criteria = criteria.add(Expression.eq("groupId", groupId));
        }
        criteria = SSqlExpression.getTermExpression(criteria, term);
        return criteria.setProjection(Projections.rowCount()).intUniqueResult();
    }
    //------------------------------------------------------------------------------------------------------------------

    /**
     * 投票项目搜索
     *
     * @param tid        主题id
     * @param id         id
     * @param find       查询
     * @param term       条件
     * @param sortString 排序
     * @param page       页数
     * @param count      行数
     * @return 投票选项列表
     * @throws Exception 异常
     */
    @Override
    public List<VoteItem> getItemList(
            String tid,
            String id,
            String find,
            String term,
            String sortString,
            int page, int count) throws Exception {
        Criteria criteria = createCriteria(VoteItem.class).add(Expression.eq("topicId", tid));
        if (!StringUtil.isNull(find)) {
            criteria = criteria.add(Expression.like("title", "%" + StringUtil.checkSql(find) + "%"));
        }
        if (!StringUtil.isEmpty(id)) {
            criteria = criteria.add(Expression.eq("id", id));
        }
        criteria = SSqlExpression.getTermExpression(criteria, term);
        criteria = SSqlExpression.getSortOrder(criteria, sortString);
        return criteria.setCurrentPage(page).setTotalCount(count).list(false);
    }

    /**
     * @param tid  主题id
     * @param id   id
     * @param find 查询
     * @param term 条件
     * @return 行数, 投票项目有几个
     * @throws Exception 异常
     */
    @Override
    public int getItemCount(
            String tid,
            String id,
            String find,
            String term
    ) throws Exception {
        Criteria criteria = createCriteria(VoteItem.class).add(Expression.eq("topicId", tid));
        if (!StringUtil.isNull(find)) {
            criteria = criteria.add(Expression.like("title", "%" + StringUtil.checkSql(find) + "%"));
        }
        if (!StringUtil.isEmpty(id)) {
            criteria = criteria.add(Expression.eq("id", id));
        }
        criteria = SSqlExpression.getTermExpression(criteria, term);
        return criteria.setProjection(Projections.rowCount()).intUniqueResult();
    }

    /**
     * 例子类似mybatis方式的查询
     * @return 投票列表
     */
    @Override
    public List<VoteTopic> getVoteTopicList() throws Exception {
        TableModels soberTable = getSoberTable(VoteTopic.class);
        Map<String, Object> valueMap = new HashMap<String, Object>();
        valueMap.put("voteTopicTable", soberTable.getName());
        valueMap.put("topicText", null);
        SqlMapClient sqlMapClient = buildSqlMap();
        return sqlMapClient.query(DemoIoc.namespace, getClassMethodName(), valueMap, 1, 10, false, false);
    }
}