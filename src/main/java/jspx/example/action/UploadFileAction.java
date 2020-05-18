/*
 * Copyright © 2004-2014 chenYuan. All rights reserved.
 * @Website:wwww.jspx.net
 * @Mail:39793751@qq.com
 * @author: chenYuan , 陈原
 * @License: Jspx.net Framework Code is open source (LGPL)，Jspx.net Framework 使用LGPL 开源授权协议发布。
 * @jvm:jdk1.6+  x86/amd64
 *
 */
package jspx.example.action;

import com.github.jspxnet.txweb.annotation.MulRequest;
import com.github.jspxnet.txweb.support.MultipartSupport;
import com.github.jspxnet.upload.MultipartRequest;
import com.github.jspxnet.upload.UploadedFile;


/**
 * Created with IntelliJ IDEA.
 * User: chenyuan
 * Date: 12-8-19
 * Time: 下午8:14
 * 这只是一个简单的演示，实际使用中使用 com.jspx.txweb.action.UploadFileAction
 */
public class UploadFileAction extends MultipartSupport {

    public UploadFileAction() {

    }


    /**
     * @return 得到配置允许上传的文件类型
     */
    public String getFileTypes() {
        return "*";
    }

    /**
     * @return 最大上传限制
     */
    public int getMaxPostSize() {

        return 1024*1024*20;
    }

    /**
     * @return 得到上传路径
     */
    public String getSaveDirectory() {
        return "d:/upload";
    }



    /**
     * @return 是否覆盖
     */
    public boolean getCovering() {
        return false;
    }

    /**
     * @param multipartRequest 请求接口
     */
    @MulRequest(covering = "@covering", saveDirectory = "@saveDirectory", fileTypes = "@fileTypes", maxPostSize = "@maxPostSize")
    public void setMultipartRequest(MultipartRequest multipartRequest) {
        request = this.multipartRequest = multipartRequest;
    }


    /**
     *
     * 兼容swfupload 和 kindeditor, 和UEditor 1.2.0 的返回结果，当然普通页面上传也没问题
     * @return json 返回结果
     * @throws Exception
     */
    @Override
    public String execute() throws Exception {

        if (multipartRequest!=null)
        for (UploadedFile uf : multipartRequest.getFiles()) {
            addActionMessage("上传结束:" + uf.getOriginal());
        }

        return getActionResult();
    }

}