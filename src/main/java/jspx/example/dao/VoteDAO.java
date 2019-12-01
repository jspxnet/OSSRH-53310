package jspx.example.dao;

import com.github.jspxnet.sober.SoberSupport;
import jspx.example.table.VoteItem;
import jspx.example.table.VoteTopic;

import java.sql.SQLException;
import java.util.List;

public interface VoteDAO extends SoberSupport {
    int getSumVotePoint(String topicId);

    boolean updateSortDate(String[] topicIds);

    boolean updateSortType(String[] topicIds, int sortType);

    List<VoteItem> getVoteList(String topicId);

    VoteTopic getFirstVoteTopic(String groupId);

    VoteTopic getVoteTopic(String topicId) throws SQLException;

    boolean postVote(String[] voteIds) throws Exception;

    //不删除投票日志
    boolean deleteVote(String topicId);

    //删除投票日志记录
    boolean deleteVote(String[] topicIds);

    List<VoteTopic> getVoteTopicForGroupId(String groupId);

    List<VoteTopic> getList(
            String find,
            String term,
            String sortString,
            long uid,
            String groupId,
            int page, int count) throws Exception;

    int getCount(
            String find,
            String term,
            long uid,
            String groupId
    ) throws Exception;

    List<VoteItem> getItemList(
            String tid,
            String id,
            String find,
            String term,
            String sortString,
            int page, int count) throws Exception;

    int getItemCount(
            String tid,
            String id,
            String find,
            String term
    ) throws Exception;


    List<VoteTopic> getVoteTopicList();

}
