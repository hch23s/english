package study.util;

import java.util.List;

import org.springframework.data.domain.Page;

/**
 * 分页
 * @author Administrator
 *
 */
public class PageResult {

	// 当前页
	private long page;
	// 前一页
	private long prePage;
	// 后一页
	private long nextPage;
	// 每页大小
	private long pageSize;
	// 总条数
	private long totalCount;
	// 总页数
	private long pageCount;
	// 当前页数据
	private List<?> rows;

	public long getPage() {
		return page;
	}

	public void setPage(long page) {
		this.page = page;
	}

	public long getPrePage() {
		return prePage;
	}

	public void setPrePage(long prePage) {
		this.prePage = prePage;
	}

	public long getNextPage() {
		return nextPage;
	}

	public void setNextPage(long nextPage) {
		this.nextPage = nextPage;
	}

	public long getPageSize() {
		return pageSize;
	}

	public void setPageSize(long pageSize) {
		this.pageSize = pageSize;
	}

	public long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}

	public long getPageCount() {
		return pageCount;
	}

	public void setPageCount(long pageCount) {
		this.pageCount = pageCount;
	}

	public List<?> getRows() {
		return rows;
	}

	public void setRows(List<?> rows) {
		this.rows = rows;
	}

	public PageResult() {
		super();
	}
	public PageResult(Page<?> pages,int pageSize,int pageNo) {
		this.setPage(pageNo);
		int nextPage =pageNo + 1;
		if(nextPage > pages.getTotalPages())
			nextPage = pages.getTotalPages();
		int prePage =  pageNo -1;
		if(prePage<1)
			prePage = 1;
		this.setNextPage(nextPage);
		this.setPrePage(prePage);
		this.setPageCount(pages.getTotalPages());
		this.setPageSize(pageSize);
		
		this.setRows(pages.getContent());
		this.setTotalCount(pages.getTotalElements());		
	}

	public PageResult(List list,int pageSize,int pageNo,int totalCount) {
		this.setPage(pageNo);
		int nextPage =pageNo + 1;
		int pageCount = totalCount/ pageSize;
		if (totalCount > pageSize * pageCount) {
			pageCount++;
		}

		if(nextPage > pageCount)
			nextPage = pageCount;
		int prePage =  pageNo -1;
		if(prePage<1)
			prePage = 1;
		this.setNextPage(nextPage);
		this.setPrePage(prePage);
		this.setPageCount(pageCount);
		this.setPageSize(pageSize);

		this.setRows(list);
		this.setTotalCount(totalCount);
	}

}
