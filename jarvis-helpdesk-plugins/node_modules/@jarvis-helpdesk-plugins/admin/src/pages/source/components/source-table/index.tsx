import React, { ReactNode, useState } from 'react';
import { FileEarmark, Globe } from 'react-bootstrap-icons';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { getSourceApi, updateSourceStatusApi } from '@/src/apis/source';
import { Card } from '@/src/components/card';
import DataTable from '@/src/components/data-table';
import { createDataTableQueryKey } from '@/src/components/data-table/utils/create-datatable-query-key';
import Switch from '@/src/components/switch';
import FailToastDescription from '@/src/components/toaster/components/fail-toast-description';
import { useToast } from '@/src/components/toaster/hooks/use-toast';
import queryClient from '@/src/libs/clients/query-client';

import { bytesToSize } from '../../../../libs/utils/byte-to-size';
import { formatISODate } from '../../../../libs/utils/format-iso-date';

import DeleteSourceModal from './components/delete-modal';

const SourceTable = ({ emptyPlaceholder }: { emptyPlaceholder: ReactNode }) => {
  const params = useParams();
  const knowledgeId = params.knowledgeId || '';
  const { toast } = useToast();
  const [loadingRows, setLoadingRows] = useState<{ [key: string]: boolean }>({});

  const { mutate: updateSourceStatus } = useMutation({
    mutationFn: updateSourceStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dataTableQueryKey,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: <FailToastDescription content="Source updated failed" />,
      });
    },
  });

  const toggleSourceEnable = (id: string, status: boolean) => {
    setLoadingRows((prev) => ({ ...prev, [id]: true }));
    updateSourceStatus(
      { knowledgeId, sourceId: id, status: status },
      {
        onSettled: () => {
          setLoadingRows((prev) => ({ ...prev, [id]: false }));
        },
      }
    );
  };

  const [searchParams] = useSearchParams();
  const dataTableQueryKey = createDataTableQueryKey(['sources'], searchParams);

  const fetchSources = async (searchParams: URLSearchParams) => {
    const response: {
      data?: { data: any[]; meta: { limit: number; offset: number; total: number; hasNext: boolean } };
    } = await getSourceApi(knowledgeId, searchParams);

    return {
      items: response.data?.data || [],
      total: response.data?.meta.total || 0,
    };
  };

  const columns = [
    {
      accessorKey: 'type',
      header: () => <div className="text-[13px]">Type</div>,
      cell: ({ row }: { row: any }) => (
        <div className="line-clamp-2 flex items-center justify-center text-sm">
          {row.getValue('type') === 'local_file' ? <FileEarmark /> : <Globe />}
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: () => <div className="text-[13px]">Name/Link source</div>,
      cell: ({ row }: { row: any }) => <div className="line-clamp-2 text-sm">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'size',
      header: () => <div className="text-[13px]">Size</div>,
      cell: ({ row }: { row: any }) => <div className="line-clamp-2 text-sm">{bytesToSize(row.getValue('size'))}</div>,
    },
    {
      accessorKey: 'updatedAt',
      header: () => <div className="text-[13px]">Last modified</div>,
      cell: ({ row }: { row: any }) => (
        <div className="line-clamp-2 text-sm">{formatISODate(row.getValue('updatedAt'))}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <div className="text-[13px]">Enable</div>,
      cell: ({ row }: { row: any }) => (
        <div className="flex">
          <Switch
            isLoading={loadingRows[row.original.id]}
            checked={row.original.status as boolean}
            onCheckedChange={() => {
              toggleSourceEnable(row.original.id, !row.getValue('status'));
            }}
          />
        </div>
      ),
    },
    {
      id: 'action',
      header: () => <div className="text-[13px]">Actions</div>,
      cell: ({ row }: { row: any }) => {
        return (
          <div className="flex justify-center">
            <DeleteSourceModal sourceId={row.original.id as string} content={row.original.name as string} />
          </div>
        );
      },
    },
  ];

  return (
    <Card className="w-full border-0 border-b-0">
      <div className="w-full">
        <DataTable
          title={'Sources'}
          columns={columns}
          containHeader={false}
          columnWidths={{
            type: '2%',
            name: '63.42%',
            size: '10%',
            updatedAt: '15%',
            enable: '5.43%',
            action: '6.76%',
          }}
          queryKey={dataTableQueryKey}
          fetchData={fetchSources}
          pageSize={5}
          queryParameterMappingToApi={{
            offset: 'offset',
            limit: 'limit',
            query: 'query',
            order: 'order',
          }}
          allowSearch={false}
          allowNumOfRows={false}
          emptyPlaceholder={emptyPlaceholder}
        />
      </div>
    </Card>
  );
};

export default SourceTable;
