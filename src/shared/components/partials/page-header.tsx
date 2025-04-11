"use client";
import * as Form from '@/shared/components/form';
import { Button, type ButtonProps } from '@/shared/components/ui/button';
import { PlusCircle, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type FieldValues, FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

type Props = ButtonProps & {
  title: string;
  btnLabel?: string;
  navigateTo?: string;
  withIcon?: boolean;
  search?: boolean;
};

const PageHeader = ({ title, search, navigateTo, btnLabel, withIcon = false, ...buttonProps }: Props) => {
  const router = useRouter();
  const pathname = usePathname()

  const method = useForm({
    defaultValues: {
      searchTerm: '',
    },
  });

  const { handleSubmit, watch } = method;

  const st = watch('searchTerm');

  useEffect(() => {
    if (st === '') {
      router.push(`${pathname}`);
    }
  }, [st, pathname, router]);

  const onSubmit: SubmitHandler<FieldValues> = data => {
    router.push(`${pathname}?search=${data.searchTerm}`);
  }

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="sm:flex-auto">
        <h1 className="page-heading">{title}</h1>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        {navigateTo && <Link href={navigateTo!}>
          <Button size="lg" className="px-4 py-3" {...buttonProps}>
            {withIcon && <PlusCircle className="mr-2 h-4 w-4" />}
            {btnLabel}
          </Button>
        </Link>}

        {search && (
          <FormProvider {...method}>
            <form className="relative mt-4 sm:mt-0" onSubmit={handleSubmit(onSubmit)}>
              <Form.Input
                name="searchTerm"
                type="text"
                placeholder="Search..."
                className="w-full max-w-xs pr-10"

              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 mr-2">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  )
}

export default PageHeader;
